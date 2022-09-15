<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里添加备注">
    </label>
  </div>    
</template>

<script lang="ts">
export default {
  name: "Notes"
}
</script>

<style lang="scss" scoped>
  .notes {
    padding-left: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    background: #f5f5f5;
    .name {
      padding-right: 16px;
    }
    input {
      flex-grow: 1;
      line-height: 64px;
      padding-right: 16px;
      border: none;
      background: transparent;
    }
  }
</style>