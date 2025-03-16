import GroupsPageFeed from "@/src/components/UI/GroupPageFeed";

type SearchParams = Promise<{ groupId: string }>;

export default async function GroupsPage(searchParams: {
  searchParams: SearchParams;
}) {
  const groupId = (await searchParams.searchParams).groupId;

  return (
    <div className="min-h-screen  lg:mt-0">
      <GroupsPageFeed groupId={groupId} />
    </div>
  );
}
