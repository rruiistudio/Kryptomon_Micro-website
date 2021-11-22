//UTILITY FUNCTIONS
//import _ from 'lodash';
import {loadconfirm, redirect} from '../utilities.js'
import mobileAndTabletCheck from '../utilities.js'
var port = process.env.port || 5500;


mobileAndTabletCheck();
redirect();
loadconfirm();
app.listen(port);

 













