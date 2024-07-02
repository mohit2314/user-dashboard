<template>
  <div>
    <div class="flex justify-between flex-wrap">
      <div class="text-center">
        <h2
          class="text-2xl font-bold my-4 border-b-2 pb-1 border-primary text-center inline-block"
        >
          <span class="text-dark-font-color">Users</span>
        </h2>
      </div>
      <div class="flex gap-4">
        <b-field label="Search">
          <b-input
            placeholder="Search..."
            type="search"
            icon-pack="fas"
            icon="search"
            v-model="searchQuery"
          >
          </b-input>
        </b-field>
        <b-field label="Sort By">
          <b-select v-model="sortOption">
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <div class="user-list" v-if="users.length > 0 && !loading">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-card"
        @click="navigateToUserDetails(user)"
      >
        <div class="user-card__icon">
          <b-icon pack="fas" icon="user" size="is-medium"></b-icon>
        </div>
        <div class="user-card__details">
          <div class="user-card__username">
            <div>{{ user.username }}</div>
            <div class="user-card__name">{{ user.name }}</div>
          </div>
          <div>
            <a
              @click.stop
              :href="`mailto:${user.email}`"
              class="user-card__email"
              >{{ user.email }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="loading">
      <UserListShimmers />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserListShimmers from "@/components/UserListShimmers.vue";

export default {
  components: { UserListShimmers },
  data() {
    return {
      searchQuery: "",
      sortOption: "name",
      loading: false,
    };
  },
  computed: {
    ...mapState(["users"]),
    filteredUsers() {
      return this.users
        .filter((user) => {
          return (
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.username
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        })
        .sort((a, b) => {
          const fieldA = a[this.sortOption].toLowerCase();
          const fieldB = b[this.sortOption].toLowerCase();
          if (fieldA < fieldB) return -1;
          if (fieldA > fieldB) return 1;
          return 0;
        });
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),

    navigateToUserDetails(user) {
      this.$router.push(`/user/${user.id}`);
    },
  },
  async created() {
    this.loading = true;
    await this.fetchUsers();
    this.loading = false;
  },
};
</script>
<style lang="scss">
.user-list {
  @apply flex flex-col gap-4;
}

.user-card {
  @apply flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-[#EEEEF9] hover:border-primary border;

  &__icon {
    @apply bg-gray-100 rounded-full p-2 mr-4;
  }

  &__details {
    @apply flex w-full justify-between sm:items-center flex-col sm:flex-row;
  }

  &__name {
    @apply font-semibold;
  }

  &__username {
    @apply text-sm text-gray-500;
  }

  &__email {
    @apply text-primary;
  }
}
</style>
