import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {NEW_ERROR, ERROR_DESTROY} from '../constants/Constants';

var error = null;

var update = (newError) =>
  error = newError;

var destroy = () =>
  error = null;

class ErrorStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions(action) {
    switch(action.actionType) {
      case NEW_ERROR:
        error = action.errorMessage;
        this.emitChange(NEW_ERROR);
        break;
      case ERROR_DESTROY:
        destroy();
        this.emitChange(NEW_ERROR);
        break;
    };
  }

  addChangeListener(cb) {
    this.on(NEW_ERROR, cb);
  }

  emitChange(action) {
    this.emit(action);
  }

  removeChangeListener(cb) {
    this.removeListener(NEW_ERROR, cb);
  }

  get errorMessage() {
    return error;
  }
}

export default new ErrorStore();
