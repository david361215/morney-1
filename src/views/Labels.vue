<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </li>
    </ol>
    <div class="wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue{
    tags = store.tagList;
    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        store.createTag(name);
      } else {
        window.alert('标签名不能为空');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: #fff;
    padding-left:16px;
    .tag {
      min-height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      >.icon {
        width:24px;
        height:24px;
        margin-right: 16px;
      }
    }
  }
  .wrapper {
    margin-top:44px;
    text-align: center;
  }

</style>