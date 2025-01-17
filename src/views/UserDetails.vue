<template>
  <div class="p-4">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item href="#" @click="$router.push('/')"
        >Users</b-breadcrumb-item
      >
      <b-breadcrumb-item :active="$route.params.id">{{
        userDetails.name
      }}</b-breadcrumb-item>
    </b-breadcrumb>
    <div
      v-if="userDetails && !loading"
      class="flex flex-col md:flex-row gap-4 my-4"
    >
      <section
        class="border-primary border bg-[#EEEEF9] p-4 rounded-lg shadow-md flex-1"
      >
        <h2 class="text-xl font-semibold mb-2 border-b pb-2">Contact Info</h2>
        <p>
          <span class="font-bold">Username:</span> {{ userDetails.username }}
        </p>
        <p>
          <span class="font-bold">Email:</span>
          <a :href="`mailto:${userDetails.email}`" class="text-primary">{{
            userDetails.email
          }}</a>
        </p>
        <p>
          <span class="font-bold">Phone:</span>
          <a :href="`tel:${userDetails.phone}`" class="text-primary">{{
            userDetails.phone
          }}</a>
        </p>
        <p>
          <span class="font-bold">Website:</span>
          <a
            :href="`http://${userDetails.website}`"
            target="_blank"
            class="text-primary"
            >{{ userDetails.website }}</a
          >
        </p>
      </section>

      <section
        class="bg-[#E6F5F3] border border-green-500 p-4 rounded-lg shadow-md flex-1"
      >
        <h2 class="text-xl font-semibold mb-2 border-b pb-2">Address</h2>
        <p>
          {{ userDetails.address.suite }} {{ userDetails.address.street }},
          {{ userDetails.address.city }}, {{ userDetails.address.zipcode }}
        </p>
      </section>

      <section
        class="bg-[#FCEFEF] border border-pink-500 p-4 rounded-lg shadow-md flex-1"
      >
        <h2 class="text-xl font-semibold mb-2 border-b pb-2">Company</h2>
        <p>
          <span class="font-bold">Company Name:</span>
          {{ userDetails.company.name }}
        </p>
        <p>
          <span class="font-bold">Company bs:</span>
          {{ userDetails.company.bs }}
        </p>
        <p>
          <i>"{{ userDetails.company.catchPhrase }}"</i>
        </p>
      </section>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-else-if="loading">
      <UserDetailShimmers
        class="border-primary border bg-[#EEEEF9] p-4 rounded-lg shadow-md flex-1 post-card"
      />
      <UserDetailShimmers
        class="border-green-500 border bg-[#E6F5F3] p-4 rounded-lg shadow-md flex-1 post-card"
      />
      <UserDetailShimmers
        class="border-pink-500 border bg-[#FCEFEF] p-4 rounded-lg shadow-md flex-1 post-card"
      />
    </div>
    <div>
      <section>
        <div class="mb-2">
          <h2
            class="text-2xl font-bold my-4 border-b-2 pb-1 border-primary text-center inline-block"
          >
            <span class="text-dark-font-color">Posts by </span>
            <span class="text-primary">{{ userDetails.name }}</span>
          </h2>
        </div>
        <div
          v-if="userPosts.length && !loading"
          class="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div v-for="post in userPosts" :key="post.id" class="post-card">
            <div class="text-xl text-dark-font-color font-bold capitalize">
              {{ post.title }}
            </div>
            <span class="text-xs">{{ new Date().toDateString() }}</span>
            <p class="mt-2">{{ post.body }}</p>
            <a href="#" class="text-primary mt-2">Read more...</a>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-else-if="loading">
          <UserDetailShimmers class="post-card" />
          <UserDetailShimmers class="post-card" />
          <UserDetailShimmers class="post-card" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserDetailShimmers from "@/components/UserDetailShimmers.vue";
export default {
  components: { UserDetailShimmers },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["userDetails", "userPosts"]),
  },
  methods: {
    ...mapActions(["fetchUserDetails", "fetchUserPosts"]),
  },
  async created() {
    const userId = this.$route.params.id;
    this.loading = true;
    await this.fetchUserDetails(userId);
    await this.fetchUserPosts(userId);
    this.loading = false;
  },
};
</script>

<style>
.post-card {
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  background-color: #fff;
  /* color: #000; */
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s ease;
}
.post-card:hover {
  border-color: rgb(89 87 193 / 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
