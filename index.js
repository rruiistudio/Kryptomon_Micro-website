//UTILITY FUNCTIONS
//import _ from 'lodash';
import {loadconfirm, redirect} from '../scripts/utilities.js'
import mobileAndTabletCheck from '../scripts/utilities.js'
var port = process.env.port || 5500;


mobileAndTabletCheck();
redirect();
loadconfirm();
app.listn(port);

 













