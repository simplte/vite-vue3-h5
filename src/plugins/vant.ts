import { Button, Cell, CellGroup, List } from 'vant';
import { App } from 'vue';

export function setupVantComp(app: App<Element>) {
  app.use(Button);
  app.use(List);
  app.use(Cell);
  app.use(CellGroup);
}
