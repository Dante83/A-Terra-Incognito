from flask import Blueprint, Flask, request
from pathlib import Path, PurePath
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import shutil, os, os.path

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '../editor/example/'

#I am deciding that I don't want any uploads about 25MB
#Because you should split your content up into smaller
#chunks to all the automatic LOD system to work it's magic.
app.config['MAX_CONTENT_PATH'] = 25 * 1_048_576

@app.route('/files/list', methods = ['GET'])
def list_files_and_folders():
    #curl http://127.0.0.1:5000/files/list?directory=test_folder%2f
    #Grab a list of all files/folders in a specific directory
    root_dir = Path(app.config['UPLOAD_FOLDER']).resolve()
    relative_directory = request.args.get('directory')
    full_directory = Path(os.path.join(root_dir, relative_directory)).resolve()
    full_pure_directory = PurePath(full_directory)
    if os.path.exists(full_directory) and full_pure_directory.is_relative_to(root_dir):
        return {
            'success': True,
            'msg': os.listdir(full_directory),
        }
    else:
        return {
            'success': False,
            'msg': "No such directory."
        }

@app.route('/projects/list', methods = ['GET'])
def list_projects():
    #Tested with...
    #curl http://127.0.0.1:5000/projects/list?directory=test_folder%2f
    #Grab a list of all files/folders in a specific directory
    #We are sending over the directory like my_file_folder_name%2fmy_other_folder%2f
    #The %2f is a / url encoded.
    root_dir = Path(app.config['UPLOAD_FOLDER']).resolve()
    relative_directory = request.args.get('directory')
    full_directory = Path(os.path.join(root_dir, relative_directory)).resolve()
    full_pure_directory = PurePath(full_directory)
    if os.path.exists(full_directory) and full_pure_directory.is_relative_to(root_dir):
        project_folders = []
        project_names = []
        for potential_project_name in os.listdir(full_directory):
            potential_project_path = os.path.join(full_directory, potential_project_name)
            potential_project_save_state_path = os.path.join(potential_project_path, 'save_state.json')
            if os.path.isdir(potential_project_path) and os.path.exists(potential_project_save_state_path):
                project_names += [potential_project_name]

        return {
            'success': True,
            'project_names': project_names
        }
    else:
        return {
            'success': False,
            'msg': "No such directory."
        }

@app.route('/files/upload', methods = ['GET', 'POST'])
def upload_file():
    #Tested with...
    #curl --form "file=@test_image.png" http://127.0.0.1:5000/files/upload?directory=test_folder%2f
    if request.method == 'POST':
        try:
            root_dir = Path(app.config['UPLOAD_FOLDER']).resolve()
            f = request.files['file']
            file_directory = request.args.get('directory')
            file_name = secure_filename(f.filename)
            full_directory = Path(os.path.join(root_dir, file_directory)).resolve()
            full_pure_directory = PurePath(full_directory)
            full_path = Path(os.path.join(full_directory, file_name)).resolve()
            if os.path.exists(full_directory) and full_pure_directory.is_relative_to(root_dir):
                f.save(full_path)
                return {
                    'success': True,
                    'msg': "File uploaded successfully."
                }
            else:
                return {
                    'success': False,
                    'msg': 'The path to this file does not exist.'
                }
        except(e):
            return {
                'success': False,
                'msg': sys.exc_info()[0]
            }
    else:
        return {
            'success': False,
            'msg': 'Not a post. No file uploaded.'
        }

@app.route('/files/move', methods = ['GET'])
def move_file():
    #Testing with...
    #curl "http://127.0.0.1:5000/files/move?starting_path=test_folder%2fother_test.txt&ending_path=test_folder2%2fyet_another_test.txt"
    #curl "http://127.0.0.1:5000/files/move?starting_path=test_folder%2fother_test.txt&ending_path=test_folder2%2fyet_another_test.txt&force_move=true"
    #Starting from the root upload directory, let's see that the path to both
    #files actually exists and is still inside of the upload_folder and
    root_path = Path(app.config['UPLOAD_FOLDER']).resolve()
    starting_path = Path(os.path.join(root_path, request.args.get('starting_path'))).resolve()
    ending_path = Path(os.path.join(root_path, request.args.get('ending_path'))).resolve()
    starting_pure_path = PurePath(starting_path)
    ending_pure_path = PurePath(ending_path)
    if starting_pure_path.is_relative_to(root_path) and \
    ending_pure_path.is_relative_to(root_path) and \
    os.path.exists(starting_path) and starting_path.is_file():
        if (ending_path.exists() and request.args.get('force_move') == 'true') or not ending_path.exists():
            #If so, proceed to move the file to this new directory
            starting_path.replace(ending_path)
            return {
                'success': True,
                'msg': 'File moved.'
            }
        else:
            return {
                'success': False,
                'require_approval': True,
                'msg': 'A file already exists with that name at that location. Approval required.'
            }
    else:
        return {
            'success': False,
            'msg': 'The starting or ending folders are not in the upload directory, the starting folder path does not exist or the starting path is not a file.'
        }

@app.route('/files/delete', methods = ['GET'])
def delete_file():
    #Testing with...
    #curl "http://localhost:5000/files/delete?deletion_path=test_folder/other_test.txt"
    #Double check the file exists at this location, if so, delete it
    root_path = Path(app.config['UPLOAD_FOLDER']).resolve()
    deletion_path = Path(os.path.join(root_path, request.args.get('deletion_path'))).resolve()
    deletion_pure_path = PurePath(deletion_path)
    if deletion_pure_path.is_relative_to(root_path) and \
    deletion_path.exists() and deletion_path.is_file():
        #If so, proceed to delete this file
        deletion_path.unlink()
        return {
            'success': True,
            'msg': 'File deleted.'
        }
    else:
        return {
            'success': False,
            'msg': 'This file does not exist or is not a file.'
        }

@app.route('/folders/create', methods = ['GET'])
def create_folder():
    #Testing with...
    #curl "http://localhost:5000/folders/create?directory=test_folder%2ftesting2%2fwack&folder_name=folder_creation_test"
    #Check to see that the folder actually exists, if so download it
    root_dir = Path(app.config['UPLOAD_FOLDER']).resolve()
    directory = request.args.get('directory')
    folder_name = request.args.get('folder_name')
    full_path = Path(os.path.join(root_dir, directory, folder_name)).resolve()
    full_pure_path = PurePath(full_path)
    if not full_path.exists() and full_pure_path.is_relative_to(root_dir):
        try:
            full_path.mkdir(parents=True, exist_ok=True)
            return {
                'success': True,
                'msg': "Folder created."
            }
        except BaseException as err:
            return {
                'success': False,
                'msg': "An error occured while trying to create this folder"
            }
    else:
        return {
            'success': False,
            'msg': 'This path name already exists, or is not relative to the upload directory.'
        }

@app.route('/folders/move', methods = ['GET'])
def move_folder():
    #Testing with...
    #curl "http://localhost:5000/folders/move?starting_path=test_folder%2ftesting2&ending_path=test_folder2%2fmoved_folder"
    #Starting from the root upload directory, let's see that the path to both
    #files actually exists and is still inside of the upload_folder and
    root_path = Path(app.config['UPLOAD_FOLDER']).resolve()
    starting_path = Path(os.path.join(root_path, request.args.get('starting_path'))).resolve()
    ending_path = Path(os.path.join(root_path, request.args.get('ending_path'))).resolve()
    starting_pure_path = PurePath(starting_path)
    ending_pure_path = PurePath(ending_path)
    if starting_pure_path.is_relative_to(root_path) and \
    ending_pure_path.is_relative_to(root_path) and \
    os.path.exists(starting_path) and starting_path.is_dir():
        if (ending_path.exists() and request.args.get('force_move') == 'true') or not ending_path.exists():
            #If so, proceed to move the file to this new directory
            starting_path.replace(ending_path)
            return {
                'success': True,
                'msg': 'Folder moved.'
            }
        else:
            return {
                'success': False,
                'require_approval': True,
                'msg': 'A folder already exists with that name at that location. Approval required.'
            }
    else:
        return {
            'success': False,
            'msg': 'The starting or ending folders are not in the upload directory, the starting folder path does not exist or the starting path is not a file.'
        }

@app.route('/folders/delete', methods = ['GET'])
def delete_folder():
    #Testing with...
    #curl "http://localhost:5000/folders/delete?deletion_path=test_folder%2fother_project"
    root_path = Path(app.config['UPLOAD_FOLDER']).resolve()
    folder_name = request.args.get('deletion_path')
    full_path = Path(os.path.join(root_path, folder_name)).resolve()
    full_pure_path = PurePath(full_path)
    if full_path.exists() and full_pure_path.is_relative_to(root_path) and full_path.is_dir():
        shutil.rmtree(full_path)
        return {
            'success': True,
            'msg': 'File deleted.'
        }
    else:
        return {
            'success': False,
            'msg': 'This path name does not exist.'
        }

if __name__ == '__main__':
    app.run(debug=True)
