class Tracker {
  constructor() {
    console.log('tracker');
  }
  send(params) {
    console.log(params);
  }
}
export default new Tracker();
