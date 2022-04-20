import {action, computed, makeObservable, observable} from 'mobx';

class ViewModel {
  @observable private count = 0;

  constructor() {
    makeObservable(this);
  }

  @action onClick = (): void => {
    this.count += 1;
  };

  @computed get countLabel(): string {
    return `You clicked ${this.count} times`;
  }
}

export default ViewModel;
