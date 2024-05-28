<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger>
      <UiAvatar>
        <UiAvatarImage :src="userImage" :alt="`Avatar of ${username}`" />
        <UiAvatarFallback>{{ userInitial }}</UiAvatarFallback>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent>
      <UiDropdownMenuItem>
        <NuxtLink to="/account">
          <div class="flex items-center">
            <Icon name="ph:user" class="w-4 h-4 mr-3" />
            Account
          </div>
        </NuxtLink>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem>
        <button type="button" @click="() => signOut()">
          <div class="flex items-center">
            <Icon name="uil:signout" class="w-4 h-4 mr-3" />
            Sign out
          </div>
        </button>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem class="sm:hidden">
        <div class="flex items-center"><Icon name="ph:currency-dollar" class="w-4 h-4 mr-3" /> <PricingLink /></div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts" setup>
const { userImage, userInitial, username } = defineProps<{
  userImage: string;
  username: string;
  userInitial: string;
}>();

const { signOut } = useAuth();
</script>
