import DEFAULT_URL from '@/assets/images/loadingForProduct.gif';

import { ImageManger, State } from './Imagemanger';
export default class Lazy {
  loading: string;
  error: string;
  managerQueue: any[];
  observer: IntersectionObserver | null;
  private cache;
  constructor(options) {
    this.managerQueue = [];
    this.observer = null;
    this.initIntersectionObserver();

    this.loading = options.loading || DEFAULT_URL;
    this.error = options.error || DEFAULT_URL;

    this.cache = new ImageCache({ maxSize: 3 });
  }
  add(el, binding) {
    const src = binding.value;
    const manager = new ImageManger({
      el,
      src,
      loading: this.loading,
      error: this.error,
      state: 0,
      cache: this.cache,
    });
    this.managerQueue.push(manager);
    this.observer && this.observer.observe(el);
  }

  initIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(
              this.managerQueue.findIndex((m) => {
                return m.el == entry.target;
              })
            );

            const manager = this.managerQueue.find((m) => {
              return m.el == entry.target;
            });
            //  TODO 这块一直进不去的主要原因个人理解是因为 虚拟列表吧之前的dom重新渲染了 所以状态一直不是加载完成，明天用非虚拟列表验证一下
            if (manager) {
              if (manager.state == State.loaded) {
                this.removeManager(manager);
                return;
              }
            }
            manager.load();
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0,
      }
    );
  }
  removeManager(manager) {
    const index = this.managerQueue.indexOf(manager);
    if (index > -1) {
      this.managerQueue.splice(index, 1);
    }
    if (this.observer) {
      this.observer.unobserve(manager.el);
    }
  }
  remove(el) {
    const manager = this.managerQueue.find((manager) => {
      return manager.el === el;
    });
    if (manager) {
      this.removeManager(manager);
    }
  }
  update(el, binding) {
    const src = binding.value;
    const manager = this.managerQueue.find((manager) => {
      return manager.el === el;
    });
    if (manager) {
      manager.update(src);
    } else {
      this.add(el, binding);
    }
  }
}

class ImageCache {
  cacheList: Set<string>;
  maxSize: number;
  constructor(options) {
    this.maxSize = options?.maxSize ?? 10;
    this.cacheList = new Set();
  }
  has(key) {
    return this.cacheList.has(key);
  }
  add(key) {
    this.cacheList.add(key);
    if (this.cacheList.size > this.maxSize) {
      this.delete();
    }
  }
  delete() {
    const array = Array.from(this.cacheList);
    this.cacheList.delete(array[0]);
  }
}
