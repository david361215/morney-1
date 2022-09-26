<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span>编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem 
        :value="currentTag.name" 
        field-name="标签名" 
        placeholder="请输入标签名"
        @update:value="update"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import FormItem from '@/components/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {FormItem, Button}
  })
  
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if(!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if(this.currentTag) {
        this.$store.commit('updateTag', {
          id: this.currentTag.id,
          name
        })
      }
    }

    remove() {
      if(this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }

    goBack() {
      this.$router.back();
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