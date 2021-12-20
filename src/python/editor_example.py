from flask import Flask, request
from pathlib import Path, PurePath
from werkzeug import secure_filename
import shutil, os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '../src/edit/example/resources/'

#I am deciding that I don't want any uploads about 25MB
#Because you should split your content up into smaller
#chunks to all the automatic LOD system to work it's magic.
app.config['MAX_CONTENT_PATH'] = 25 * 1_048_576

bp = Blueprint('test', __name__, template_folder='templates')

@bp.route('files/list', methods = ['GET'])
def list_files_and_folders():
    #Grab a list of all files/folders in a specific directory
    full_directory = os.path.join(app.config['UPLOAD_FOLDER'], request.args.get('directory'))
    if os.path.exists(full_directory):
        return {
            'success': True,
            'msg': os.listdir(full_directory),
        }
    else:
        return {
            'success': False,
            'msg': "No such directory."
        }

@bp.route('projects/list', methods = ['GET'])
def list_projects():
    #Grab a list of all files/folders in a specific directory
    full_directory = os.path.join(app.config['UPLOAD_FOLDER'], request.args.get('directory'))
    if os.path.exists(full_directory):
        project_folders = []
        project_names = []
        for potential_project_name in os.listdir(full_directory):
            potential_folder_path = os.path.join(app.config['UPLOAD_FOLDER'], potential_project_name)
            potential_project_path = os.path.join(potential_folder_path, '/save_state.json')
            if os.path.isdir(potential_folder_path) and os.path.exists(potential_project_path):
                project_names += [potential_project_name]

        return {
            'success': True,
            'base_path': full_directory,
            'project_names': project_names,
        }
    else:
        return {
            'success': False,
            'msg': "No such directory."
        }

@bp.route('files/upload', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        try:
            f = request.files['file']
            file_directory = secure_filename(request.args.get('directory'))
            file_name = secure_filename(f.filename)
            full_directory = os.path.join(app.config['UPLOAD_FOLDER'], file_directory)
            full_path = os.path.join(full_directory, file_name)
            if os.path.exists(full_directory):
                f.save(file_name)
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

@bp.route('files/move', methods = ['GET'])
def move_file():
    #Starting from the root upload directory, let's see that the path to both
    #files actually exists and is still inside of the upload_folder and
    root_path = app.config['UPLOAD_FOLDER']
    starting_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(request.args.get('starting_path')))
    ending_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(request.args.get('ending_path')))
    starting_pure_path = PurePath(starting_path)
    ending_pure_path = PurePath(ending_path)
    if starting_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and \
    ending_path_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and \
    os.path.exists(starting_path) and os.path.isFile(starting_path):
        #If so, proceed to move the file to this new directory
        shutil.move(starting_path, ending_path)
    else:
        return {
            'success': False,
            'msg': 'The starting or ending folders are not in the upload directory, the starting folder path does not exist or the starting path is not a file.'
        }

@bp.route('files/delete', methods = ['GET'])
def delete_file():
    #Double check the file exists at this location, if so, delete it
    root_path = app.config['UPLOAD_FOLDER']
    deletion_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(request.args.get('deletion_path')))
    deletion_pure_path = PurePath(deletion_path)
    if deletion_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and \
    os.path.exists(deletion_path) and os.path.isFile(deletion_path):
        #If so, proceed to delete this file
        shutil.remove(deletion_path)
        return {
            'success': True,
            'msg': 'File deleted.'
        }
    else:
        return {
            'success': False,
            'msg': 'This file does not exist or is not a file.'
        }

@bp.route('folders/create', methods = ['GET'])
def create_folder():
    #Check to see that the folder actually exists, if so download it
    folder_name = secure_filename(request.args.get('folder_name'))
    full_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)
    full_pure_path = PurePath(full_path)
    if not os.path.exists(full_path) and full_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']):
        try:
            Path(full_pure_path).mkdir(parents=True, exist_ok=True)
            return {
                'success': True,
                'msg': "Folder created."
            }
        except:
            return {
                'success': False,
                'msg': sys.exc_info()[0]
            }
    else:
        return {
            'success': False,
            'msg': 'This path name already exists, or is not relative to the upload directory.'
        }

@bp.route('folders/move', methods = ['GET'])
def move_folder():
    #Starting from the root upload directory, let's see that the path to both
    #files actually exists and is still inside of the upload_folder and
    root_path = app.config['UPLOAD_FOLDER']
    starting_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(request.args.get('starting_path')))
    ending_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(request.args.get('ending_path')))
    starting_pure_path = PurePath(starting_path)
    ending_pure_path = PurePath(ending_path)
    if starting_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and \
    ending_path_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and \
    os.path.exists(starting_path) and os.path.isdir(starting_path):
        #If so, proceed to move the file to this new directory
        shutil.move(starting_path, ending_path)
    else:
        return {
            'success': False,
            'msg': 'The starting or ending folders are not in the upload directory, the starting folder path does not exist or the starting path is not a folder.'
        }

@bp.route('folders/delete', methods = ['GET'])
def delete_folder():
    folder_name = secure_filename(request.args.get('folder_name'))
    full_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)
    full_pure_path = PurePath(full_path)
    if not os.path.exists(full_path) and full_pure_path.is_relative_to(app.config['UPLOAD_FOLDER']) and full_path != '/':
        try:
            shutil.rmtree(full_path)
        except OSError as e:
            return {
                'success': False,
                'msg': "Error: %s - %s." % (e.filename, e.strerror)
            }
    else:
        return {
            'success': False,
            'msg': 'This path name does not exist.'
        }

if __name__ == '__main__':
    app.run(debug=True)
    app.register_blueprint(bp, url_prefix='/world_editor')
