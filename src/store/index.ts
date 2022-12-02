import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import clone from '@/lib/clone';
import createId from "@/lib/createId";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    addDefaultTags(state) {
      const defaultTags = ['衣','食','住','行'];
      for( let i = 0; i < defaultTags.length; i++ ){
        const id = createId().toString();
        state.tagList.push({id: id, name: defaultTags[i]});
      }
      store.commit('saveTags');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if( state.tagList.length == 0 ) {
        store.commit('addDefaultTags');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList));
    },

    setCurrentTag( state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },

    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      } else {
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTags');
        window.alert('添加成功');
      }
    },
    removeTag(state, id: string) {
      const index = state.tagList.map(item => item.id).indexOf(id);
      if( index >= 0) {
        state.tagList.splice(index,1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if( idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name);
        if( nameList.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },

    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
      window.alert('创建成功');
    }
  }
})

export default store;