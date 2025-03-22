import GroupsPageFeed from "@/src/components/UI/GroupPageFeed";
import { getAllGroups, getAllMyGroups } from "@/src/services/GroupService";
import { getAllRecipes } from "@/src/services/Recipe";

type SearchParams = Promise<{ groupId: string }>;

export default async function GroupsPage(searchParams: {
  searchParams: SearchParams;
}) {
  const groupId = (await searchParams.searchParams).groupId;

  const { data: myGroups } = await getAllMyGroups([
    { name: "sort", value: "-createdAt" },
  ]);

  const { data: recipes } = await getAllRecipes([
    { name: "sort", value: "-createdAt" },
  ]);

  const { data: groups } = await getAllGroups([
    { name: "sort", value: "-createdAt" },
  ]);

  return (
    <div className="min-h-screen  lg:mt-0">
      <GroupsPageFeed
        groupId={groupId}
        groups={groups}
        myGroups={myGroups}
        recipes={recipes}
      />
    </div>
  );
}
