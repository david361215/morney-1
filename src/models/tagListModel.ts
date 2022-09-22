import createId from "@/lib/createId";

const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'}
    const id = createId().toString();
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if( idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if( nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id) {
    const index = this.data.map(item => item.id).indexOf(id);
    if( index >= 0) {
      this.data.splice(index,1);
      this.save();
      return true;
    } else {
      return false;
    }
  }
};

export default tagListModel;