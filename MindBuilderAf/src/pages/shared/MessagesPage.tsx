import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, Inbox, ArrowLeft, RefreshCw } from 'lucide-react';
import { 
  getMessagesByUser, 
  getInboxMessages, 
  getSentMessages, 
  addMessage, 
  markMessageAsRead,
  getUsers 
} from '@/lib/localStorage';
import { Message } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  
  const users = getUsers().filter(u => u.id !== user?.id);
  
  const [composeData, setComposeData] = useState({
    receiverId: '',
    subject: '',
    content: ''
  });

  if (!user) return null;

  const inboxMessages = getInboxMessages(user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sentMessages = getSentMessages(user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getUserName = (userId: string) => {
    const foundUser = getUsers().find(u => u.id === userId);
    return foundUser ? `${foundUser.firstName} ${foundUser.lastName}` : 'Unknown User';
  };

  const getUserInitials = (userId: string) => {
    const foundUser = getUsers().find(u => u.id === userId);
    return foundUser 
      ? `${foundUser.firstName.charAt(0)}${foundUser.lastName.charAt(0)}`
      : 'UN';
  };

  const handleOpenMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead && message.receiverId === user.id) {
      markMessageAsRead(message.id);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      senderId: user.id,
      receiverId: composeData.receiverId,
      subject: composeData.subject,
      content: composeData.content
    });
    toast({ title: 'Message sent successfully!' });
    setIsComposeOpen(false);
    setComposeData({ receiverId: '', subject: '', content: '' });
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    addMessage({
      senderId: user.id,
      receiverId: selectedMessage.senderId,
      subject: `Re: ${selectedMessage.subject}`,
      content: replyContent
    });
    toast({ title: 'Reply sent!' });
    setReplyContent('');
    setSelectedMessage(null);
  };

  const MessageList = ({ messages, type }: { messages: Message[], type: 'inbox' | 'sent' }) => (
    <div className="space-y-2">
      {messages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No messages in {type}
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              !message.isRead && type === 'inbox' 
                ? 'bg-primary/5 border-primary/20' 
                : 'border-border hover:bg-muted/50'
            }`}
            onClick={() => handleOpenMessage(message)}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-secondary/10 text-secondary text-sm">
                  {getUserInitials(type === 'inbox' ? message.senderId : message.receiverId)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`font-medium truncate ${!message.isRead && type === 'inbox' ? 'text-primary' : ''}`}>
                    {type === 'inbox' ? 'From: ' : 'To: '}
                    {getUserName(type === 'inbox' ? message.senderId : message.receiverId)}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm ${!message.isRead && type === 'inbox' ? 'font-medium' : ''}`}>
                  {message.subject}
                </p>
                <p className="text-sm text-muted-foreground truncate">{message.content}</p>
              </div>
              {!message.isRead && type === 'inbox' && (
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Communicate with trainers, mentors, and trainees</p>
          </div>
          <Button onClick={() => setIsComposeOpen(true)} className="gap-2">
            <Send className="h-4 w-4" /> Compose
          </Button>
        </div>

        {/* Message View or List */}
        {selectedMessage ? (
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <CardTitle className="font-heading text-lg">{selectedMessage.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  From: {getUserName(selectedMessage.senderId)} • 
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              
              {selectedMessage.senderId !== user.id && (
                <div className="space-y-3">
                  <Label>Reply</Label>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleReply} disabled={!replyContent.trim()}>
                    <Send className="h-4 w-4 mr-2" /> Send Reply
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="inbox" className="gap-2">
                    <Inbox className="h-4 w-4" />
                    Inbox ({inboxMessages.filter(m => !m.isRead).length})
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="gap-2">
                    <Send className="h-4 w-4" />
                    Sent
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="inbox">
                  <MessageList messages={inboxMessages} type="inbox" />
                </TabsContent>
                
                <TabsContent value="sent">
                  <MessageList messages={sentMessages} type="sent" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Compose Dialog */}
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Send a message to a user</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <Label>To</Label>
                <Select 
                  value={composeData.receiverId}
                  onValueChange={(value) => setComposeData({ ...composeData, receiverId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} ({u.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={composeData.content}
                  onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
