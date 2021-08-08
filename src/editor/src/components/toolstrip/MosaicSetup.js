export interface MosaicWindowProps extends MosaicKey {
  title: '';
  path: MosaicBranch[];
  className: '';
  toolbarControls: [];
  additionalControls: [];
  additionalControlButtonText?: '';
  draggable: false;
}
