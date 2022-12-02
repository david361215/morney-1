<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" :validate="saveRecord"/>
    <Tabs :data-source="recordTypeList"  :value.sync="record.type"/>
    <div class="notes">
      <FormItem 
        field-name="备注" 
        placeholder="在这里输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import NumberPad from '@/components/Money/NumberPad.vue';
import Tabs from '@/components/Tabs.vue';
import FormItem from '@/components/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: { Tags, FormItem, Tabs, NumberPad }
})

export default class Money extends Vue {

  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  }

  recordTypeList = recordTypeList;

  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }
  
  saveRecord() {
    if(this.record.tags.length === 0){
      alert('请选择一个标签');
      return '没选择标签';
    } else if (this.record.amount === 0) {
      alert('金额不能为零');
      return '金额不能为零';
    } else {
      this.$store.commit('createRecord', this.record);
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>