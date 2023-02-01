import { nanoid } from 'nanoid';
import { ref } from 'vue';
export type TreeNode = {
  id?: string;
  pid: string;
  nodeUuid?: string;
  partentUuid?: string;
  nodeType: string;
  nodeValue?: any;
  logicValue?: any;
  children: TreeNode[];
  level?: number;
};
export const useDynamicTree = (root?: TreeNode) => {
  const tree = ref<TreeNode[]>(root ? [root] : []);
  const level = ref(0);
  //添加节点
  const add = (node: TreeNode, pid = 'root'): boolean => {
    //添加根节点
    if (pid === '') {
      tree.value = [node];
      return true;
    }
    level.value = 0;
    const pNode = find(tree.value, pid);
    if (!pNode) return false;
    //嵌套关系不能超过3层
    if (pNode.level && pNode.level > 2) return false;
    if (!node.id) {
      node.id = nanoid();
    }
    if (pNode.nodeType === 'operator') {
      pNode.children.push(node);
    } else {
      //如果父节点不是关系节点，则构建新的关系节点
      const current = JSON.parse(JSON.stringify(pNode));
      current.pid = pid;
      current.id = nanoid();
      Object.assign(pNode, {
        nodeType: 'operator',
        nodeValue: 'and',
        // 重置回显信息
        logicValue: undefined,
        nodeUuid: undefined,
        parentUuid: undefined,
        children: [current, node],
      });
    }
    return true;
  };
  //删除节点
  const remove = (id: string) => {
    const node = find(tree.value, id);
    if (!node) return;
    //根节点处理
    if (node.pid === '') {
      tree.value = [];
      return;
    }
    const pNode = find(tree.value, node.pid);
    if (!pNode) return;
    const index = pNode.children.findIndex((item) => item.id === id);
    if (index === -1) return;
    pNode.children.splice(index, 1);
    if (pNode.children.length === 1) {
      //如果只剩下一个节点，则替换父节点（关系节点）
      const [one] = pNode.children;
      Object.assign(
        pNode,
        {
          ...one,
        },
        {
          pid: pNode.pid,
        }
      );
      if (pNode.pid === '') {
        pNode.id = 'root';
      }
    }
  };
  //切换逻辑关系：且/或
  const toggleOperator = (id: string) => {
    const node = find(tree.value, id);
    if (!node) return;
    if (node.nodeType !== 'operator') return;
    node.nodeValue = node.nodeValue === 'and' ? 'or' : 'and';
  };
  //查找节点
  const find = (node: TreeNode[], id: string): TreeNode | undefined => {
    // console.log(node, id)
    for (let i = 0; i < node.length; i++) {
      if (node[i].id === id) {
        Object.assign(node[i], {
          level: level.value,
        });
        return node[i];
      }
      if (node[i].children?.length > 0) {
        level.value += 1;
        const result = find(node[i].children, id);
        if (result) {
          return result;
        }
        level.value -= 1;
      }
    }
    return undefined;
  };
  //提供遍历节点方法，支持回调
  const dfs = (node: TreeNode[], callback: (node: TreeNode) => void) => {
    for (let i = 0; i < node.length; i++) {
      callback(node[i]);
      if (node[i].children?.length > 0) {
        dfs(node[i].children, callback);
      }
    }
  };
  return {
    tree,
    add,
    remove,
    toggleOperator,
    dfs,
  };
};
