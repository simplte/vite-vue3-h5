import { defineComponent } from 'vue';
import { RouteMeta as OriginRouteMeta, RouteRecordRaw } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  route?: Record<string, any>;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component | string;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  sort?: number;
}

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta extends OriginRouteMeta {
  // 是否隐藏子菜单，设置 true 隐藏时，配合 redirect 重定向默认变成一级菜单
  hideChildrenInMenu?: boolean;
  // 设置标题
  title?: string;
  // 用于排序
  sort?: number;
  // 组件
  component?: Component | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: unknown;
}
