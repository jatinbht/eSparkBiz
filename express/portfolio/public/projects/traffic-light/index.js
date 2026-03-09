import { Traffic } from './controller/Traffic.js';
import { render } from './view/render.js';

const traffic = new Traffic(render);
traffic.start();