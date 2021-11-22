<script lang="tsx">
import { ref } from 'vue';
export default {
  name: 'WelcomeCom',
  setup() {
    const root = ref(123);
    const clickTsxfun = () => {
      root.value++;
    };
    return () => (
      <>
        <div>welcomeCom{root.value}</div>
        <div onClick={clickTsxfun}>点击tsxcompFun</div>
      </>
    );
  },
};

// with JSX
</script>
