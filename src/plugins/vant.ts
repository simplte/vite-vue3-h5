import {
  Button,
  Card,
  Cell,
  CellGroup,
  Field,
  Grid,
  GridItem,
  Image as VanImage,
  List,
  NavBar,
  NoticeBar,
  Skeleton,
  Swipe,
  SwipeItem,
  Switch,
  Tabbar,
  TabbarItem,
} from 'vant';
import { App } from 'vue';

export function setupVantComp(app: App<Element>) {
  app.use(Button);
  app.use(List);
  app.use(Cell);
  app.use(CellGroup);
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(NoticeBar);
  app.use(Skeleton);
  app.use(NavBar);
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Grid);
  app.use(Card);
  app.use(GridItem);
  app.use(VanImage);
  app.use(Switch);
  app.use(Field);
}
