import {Redirect, Route} from 'react-router-dom'

const PrivateRouter = ({ children, ...rest }) => {
    

    return (
        <div>
            <HomePage title={'HOME PAGE'}/>
        </div>
      )
    }


export default PrivateRouter