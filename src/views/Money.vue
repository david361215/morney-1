<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"  :value.sync="record.type"/>
    <div class="notes">
      <FormItem 
        field-name="备注" 
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
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

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  
  onUpdateNotes(value: string) {
    this.record.notes = value
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }
}
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>