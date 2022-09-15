<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tags"
}
</script>

<style lang="scss" scoped>
  .tags {
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    .current {
      display: flex;
      flex-wrap: wrap;
      li {
        $h: 24px;
        margin-top: 4px;
        margin-right: 12px;
        padding: 0 16px;
        line-height: $h;
        border-radius: $h/2;
        background: #d9d9d9;
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