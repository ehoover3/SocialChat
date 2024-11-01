<template>
  <aside class="sidebar-left">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
// You can import any necessary libraries or modules here if needed
</script>

<style scoped>
.sidebar-left {
  flex-shrink: 0;
  background-color: #f4f4f9;
  padding: 20px;
}

.sidebar-left ul {
  list-style: none;
  padding: 0;
}

.sidebar-left li {
  margin: 10px 0;
}

.sidebar-left a {
  text-decoration: none;
  color: #007bff;
}

.sidebar-left a:hover {
  text-decoration: underline;
}
</style>
