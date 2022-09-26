import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import clone from '@/lib/clone';
import createId from "@/lib/createId";

Vue.use(Vuex)

type RootState = {
  tagList: Tag[],
  recordList: RecordItem[],
  currentTag?: Tag
}

const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
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
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功');
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
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
    }
  }
})

export default store;