<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span>编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem 
        :value="tag.name" 
        field-name="标签名" 
        placeholder="请输入标签名"
        @update:value="update"
      />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {FormItem, Button}
  })
  export default class EditLabel extends Vue {
    tag?: Tag = undefined;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch() ;
      const tags = tagListModel.data;
      const tag = tags.filter( tag => tag.id === id)[0];
      if(tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if(this.tag) {
        tagListModel.update(this.tag.id,name);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    background: #fff;
    line-height: 48px;
    text-align: center;
    position: relative;
    > .leftIcon {
      position: absolute;
      left: 16px;
      top: 12px;
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper {
    margin-top: 8px;
    background: white;
  }
  .button-wrapper {
    text-align: center;
    margin-top: 44px;
  }

</style>