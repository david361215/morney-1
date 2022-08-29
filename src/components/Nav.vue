<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav',
}
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    font-size: 12px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    > .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33333%;
      padding: 3px 0;
      > .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected {
      color: red;
    }
  }
</style>