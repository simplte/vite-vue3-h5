export const State = {
  loading: 0,
  loaded: 1,
  error: 2,
};

export class ImageManger {
  el: HTMLElement;
  src: string;
  state: number;
  loading: string;
  error: string;
  constructor(options) {
    this.el = options.el;
    this.src = options.src;
    this.state = options.state;
    this.loading = options.loading;
    this.error = options.error;

    this.render(this.loading);
  }
  // 渲染图片
  render(url = '') {
    this.el.setAttribute('src', url);
  }
  load(next) {
    // 加载完成了
    if (this.state > State.loading) {
      return;
    }
    this.renderSrc(next);
  }
  renderSrc(next) {
    loadImage(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render(this.src);
        next && next();
      })
      .catch((error) => {
        this.state = State.error;
        this.render(this.error);
        console.warn(`加载图片失败`);
        next && next();
      });
  }
  update(src) {
    const currentSrc = this.src;
    if (src !== currentSrc) {
      this.src = src;
      this.state = State.loading;
    }
  }
}
export default function loadImage(src): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve();
      dispose();
    };
    img.onerror = function (e) {
      reject(e);
      dispose();
    };
    img.src = src;
    function dispose() {
      img.onload = img.onerror = null;
    }
  });
}
