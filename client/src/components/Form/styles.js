
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  counter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    rowGap: '20px',
  },
  h3: {
    fontSize: '40px',
    color: 'rgb(116, 7, 7)',
  },
  counterOutput: {
    fontSize: '40px',
    color: 'rgb(116, 7, 7)',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: '20px',
  },
  controlBtn: {
    fontSize: '20px',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'rgb(16, 0, 54)',
    border: '1px solid rgb(16, 0, 54)',
    cursor: 'pointer',
    transition: '0.25 ease-in-out',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
