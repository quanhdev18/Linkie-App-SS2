// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // const ChatHome = () => {
// //   return (
// //     <div>
// //       <Tabs defaultValue="account" className="w-full ">
// //         <TabsList className="flex justify-between">
// //           <TabsTrigger className="md:w-[280px]" value="chats">
// //             Chats
// //           </TabsTrigger>
// //           <TabsTrigger className="md:w-[280px]" value="people">
// //             People
// //           </TabsTrigger>
// //           <TabsTrigger className="md:w-[280px]" value="groups">
// //             Groups
// //           </TabsTrigger>
// //           <TabsTrigger className="md:w-[280px]" value="posts">
// //             Posts
// //           </TabsTrigger>
// //         </TabsList>
// //         <TabsContent value="chats">Your chats appear here</TabsContent>
// //         <TabsContent value="people">Find new peers here.</TabsContent>
// //         <TabsContent value="groups">Your groups appear here.</TabsContent>
// //         <TabsContent value="posts">New posts appear here.</TabsContent>
// //       </Tabs>
// //     </div>
// //   );
// // };
// // export default ChatHome;
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import SwipeDeck from "@/components/swipe/SwipeDeck";

// const ChatHome = () => {
//   return (
//     <div>
//       <Tabs defaultValue="people" className="w-full ">
//         <TabsList className="flex justify-between">
//           <TabsTrigger className="md:w-[280px]" value="chats" data-testid="tab-chats">
//             Chats
//           </TabsTrigger>
//           <TabsTrigger className="md:w-[280px]" value="people" data-testid="tab-people">
//             People
//           </TabsTrigger>
//           <TabsTrigger className="md:w-[280px]" value="groups" data-testid="tab-groups">
//             Groups
//           </TabsTrigger>
//           <TabsTrigger className="md:w-[280px]" value="posts" data-testid="tab-posts">
//             Posts
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="chats">Your chats appear here</TabsContent>
//         <TabsContent value="people">
//           <div className="py-4 flex justify-center">
//             <SwipeDeck />
//           </div>
//         </TabsContent>
//         <TabsContent value="groups">Your groups appear here.</TabsContent>
//         <TabsContent value="posts">New posts appear here.</TabsContent>
//       </Tabs>
//     </div>
//   );
// };
// export default ChatHome;
