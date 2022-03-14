import { ImageManger, State } from './Imagemanger';

import DEFAULT_URL from '@/assets/images/loadingForProduct.gif';
export default class Lazy {
  loading: string;
  error: string;
  managerQueue: any[];
  observer: IntersectionObserver | null;
  constructor(options) {
    this.managerQueue = [];
    this.observer = null;
    this.initIntersectionObserver();

    this.loading = options.loading || DEFAULT_URL;
    this.error = options.error || DEFAULT_URL;
  }
  add(el, binding) {
    const src = binding.value;
    const manager = new ImageManger({
      el,
      src,
      loading: this.loading,
      error: this.error,
    });
    this.managerQueue.push(manager);
    this.observer && this.observer.observe(el);
  }

  initIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const manager = this.managerQueue.find((m) => {
              return m.el == entry.target;
            });
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
}
