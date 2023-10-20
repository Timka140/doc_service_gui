<template>
    <div>
        <ul class="breadcrumb">
            <li v-for="(item) in items" :key="item.index">
                <span @click="open(item.path)" :class="{'link-secondary': item.disable, 'link-primary': !item.disable}" v-if="item.name == ''"><font-awesome-icon icon="fa-solid fa-house" /></span>
                <span @click="open(item.path)" :class="{'link-secondary': item.disable, 'link-primary': !item.disable}" v-else>{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "BreadcrumbMenu",
    props: {
        items: Object,
        open: Function,
    },

}
</script>

<style scoped>
/* Стиль списка */
ul.breadcrumb {
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Отображение элементов списка бок о бок */
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}

/* Добавить символ косой черты (/) перед/за каждым элементом списка */
ul.breadcrumb li+li:before {
  /* padding: 4px 0px 4px 4px; */
  padding-left: 6px;
  color: black;
  content: "/\00a0";
}

/* Добавить цвет для всех ссылок внутри списка */
ul.breadcrumb li span {
  /* color: #0275d8; */
  text-decoration: none;
  cursor: pointer;
}

/* Добавить цвет на наведении курсора мыши */
ul.breadcrumb li a:hover {
  /* color: #01447e; */
  text-decoration: none;
} 
</style>