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
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';

  tagListModel.fetch();

  @Component
  export default class Labels extends Vue{
    tags = tagListModel.data;
    createTag() {
      const name = window.prompt('请输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if( message === 'duplicated') {
          window.alert('标签名重复了');
        } else if (message === 'success') {
          window.alert('添加成功');
        }
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
  .createTag {
    line-height: 40px;
    padding:0 17px;
    border: none;
    border-radius: 4px;
    background: #767676;
    color: #fff;
    &-wrapper {
      margin-top:44px;
      text-align: center;
    }
}
</style>