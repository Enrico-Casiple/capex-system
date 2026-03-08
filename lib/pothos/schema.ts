import { builder } from './builder';

import './Inputs';
import './Model';
import './Model/Custom/Model';
import './Model/Resolver';
import './Model/Template/default.resolver';
import './Response';

const schema = builder.toSchema({});
export default schema;
