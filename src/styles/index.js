const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    flexGrow: 1,
  },
  header: {
    height: 60,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
  },
  toolbarContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 960,
    width: '100%',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    boxSizing: 'border-box',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  appBarButtonTitle: {
    color: '#fff',
  },
  appBarButtonIcon: {
    color: '#fff',
    marginRight: theme.spacing(1),
  },
});

export default styles;
