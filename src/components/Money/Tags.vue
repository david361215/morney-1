<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li 
        v-for="tag in tagList" :key="tag.id" 
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag)>=0}">
        {{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    selectedTags: Tag[] = [];

    get tagList() {
      return this.$store.state.tagList;
    }

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: Tag){
      this.selectedTags.length = 0;
      this.selectedTags.push(tag);
      // const index = this.selectedTags.indexOf(tag);
      // if( index >=0 ) {
      //   this.selectedTags.splice(index,1);
      // } else {
      //   this.selectedTags.push(tag);
      // }
      this.$emit('update:value',this.selectedTags);
    }


  }
</script>

<style lang="scss" scoped>
  .tags {
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    background: white;
    .current {
      display: flex;
      flex-wrap: wrap;
      li {
        $bg: #D9D9D9;
        $h: 24px;
        margin-top: 4px;
        margin-right: 12px;
        padding: 0 16px;
        line-height: $h;
        border-radius: $h/2;
        background: $bg;
        &.selected{
          background: darken($bg, 50%);
          color: white;
        }
      }
    }
    .new {
      padding-top: 16px;
      button {
        padding: 0 4px;
        border: none;
        border-bottom: 1px solid;
        color: #999;
        background: transparent;
      }
      
    }
  }
</style>