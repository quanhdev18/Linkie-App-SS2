import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChatHome = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full ">
        <TabsList className="flex justify-between">
          <TabsTrigger className="md:w-[280px]" value="chats">
            Chats
          </TabsTrigger>
          <TabsTrigger className="md:w-[280px]" value="people">
            People
          </TabsTrigger>
          <TabsTrigger className="md:w-[280px]" value="groups">
            Groups
          </TabsTrigger>
          <TabsTrigger className="md:w-[280px]" value="posts">
            Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chats">Your chats appear here</TabsContent>
        <TabsContent value="people">Find new peers here.</TabsContent>
        <TabsContent value="groups">Your groups appear here.</TabsContent>
        <TabsContent value="posts">New posts appear here.</TabsContent>
      </Tabs>
    </div>
  );
};
export default ChatHome;
