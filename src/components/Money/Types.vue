<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Types"
}
</script>

<style lang="scss" scoped>
  .types {
    display: flex;
    background: #c4c4c4;
    font-size: 24px;
    text-align: center;
    li {
      position: relative;
      width: 50%;
      line-height: 64px;
      &.selected::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>