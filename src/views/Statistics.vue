<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync='type' class-prefix="type" />
    <ol v-if="groupedList.length > 0">
      <li v-for="(group) in groupedList" :key="group.title">
        <h3 class="title">
          <span>{{ beautify(group.title) }}</span>
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.createdAt" class="record">
            <span>{{item.tags[0].name}}</span> 
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span> 
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关账目
    </div>
  </Layout>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue{

    recordTypeList = recordTypeList;
    type = '-';
    
    beautify(date: string){
      const day = dayjs(date);
      const now = dayjs()
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'),'day')){
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'),'day')){
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList(){
      return (this.$store.state as RootState).recordList;
    }

    get groupedList(){
      const {recordList} = this;
      const sortList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if( sortList.length === 0 ){ return []; }
      const groupList = [{
        title: dayjs(sortList[0].createdAt).format('YYYY-MM-DD'), 
        items: [sortList[0]],
        total: sortList[0].amount
      }]
      for( let i = 1; i < sortList.length; i++ ){
        const current = sortList[i];
        const last = groupList[groupList.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt),'day')) {
          last.items.push(current);
          last.total += current.amount;
        } else {
          groupList.push({
            title: dayjs(current.createdAt).format('YYYY-MM-DD'), 
            items: [current],
            total: current.amount
          });
        }
      }
      console.log(groupList);
      
      return groupList;
    }

    created() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style scoped lang="scss">

  %item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    padding:0 16px;
  }
  .record {
    @extend %item;
    background: #FFFFFF;
  }
  .title {
    @extend %item;
  }
  ::v-deep {
    .type-tabs-item {
      background: #C4C4C4;
      &.selected {
        background: #FFF;
        &::after {
          display: none;
        }
      }
    }
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .noResult {
    padding: 16px;
    text-align: center;
  }

</style>