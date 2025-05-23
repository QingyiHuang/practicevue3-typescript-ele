class Eventbus {
  $bus = {};
  constructor() {
    this.$bus = {};
  }
  on(fnName: string, callback: Function) {
    if (!this.$bus[fnName]) {
      this.$bus[fnName] = [];
    }
    this.$bus[fnName].push(callback);
  }
  emit(fnName: string, ...argu) {
    if (this.$bus[fnName] && this.$bus[fnName].length) {
      this.$bus[fnName].forEach((item) => {
        item(...argu);
      });
    }
  }
  off(fnName, callback) {
    if (this.$bus[fnName]) {
      this.$bus[fnName] = this.$bus[fnName].filter((item) => item !== callback);
    }
  }
}
export default Eventbus;
