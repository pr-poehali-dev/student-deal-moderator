import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface User {
  id: string;
  name: string;
  email: string;
  reputation: number;
  avatar?: string;
  faculty: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  user: User;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

interface Report {
  id: string;
  type: "listing" | "user" | "review";
  targetId: string;
  reason: string;
  description: string;
  reportedBy: User;
  createdAt: string;
  status: "pending" | "resolved";
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: 'MacBook Pro 14" M3',
    description:
      "Продаю ноутбук в отличном состоянии, использовался для учёбы. Все документы в наличии.",
    price: 85000,
    category: "Электроника",
    images: [
      "https://cdn.poehali.dev/files/5d4de3c9-7ee3-476f-b780-454376f50d32.png",
    ],
    user: {
      id: "u1",
      name: "Анна Петрова",
      email: "anna@student.bfu.ru",
      reputation: 150,
      avatar: "",
      faculty: "Информатика и ИТ",
    },
    createdAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    title: "Учебники по математике",
    description: "Комплект учебников для первого курса. Состояние хорошее.",
    price: 3500,
    category: "Учебники",
    images: [
      "https://cdn.poehali.dev/files/59738548-768f-48dc-8c50-fe2f26aa527d.png",
    ],
    user: {
      id: "u2",
      name: "Дмитрий Сидоров",
      email: "dmitry@student.bfu.ru",
      reputation: 80,
      avatar: "",
      faculty: "Математика",
    },
    createdAt: "2024-01-15T09:15:00Z",
    status: "pending",
  },
];

const mockReports: Report[] = [
  {
    id: "r1",
    type: "listing",
    targetId: "1",
    reason: "Неправильная категория",
    description: "Товар размещён не в той категории",
    reportedBy: {
      id: "u3",
      name: "Елена Иванова",
      email: "elena@student.bfu.ru",
      reputation: 200,
      avatar: "",
      faculty: "Экономика",
    },
    createdAt: "2024-01-15T11:00:00Z",
    status: "pending",
  },
];

const Index = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [comment, setComment] = useState("");
  const [penalty, setPenalty] = useState("10");
  const [isApproveMode, setIsApproveMode] = useState(true);

  const handleApprove = (listing: Listing) => {
    console.log("Approved:", listing.id);
    setSelectedListing(null);
  };

  const handleReject = (listing: Listing) => {
    console.log(
      "Rejected:",
      listing.id,
      "Comment:",
      comment,
      "Penalty:",
      penalty,
    );
    setComment("");
    setPenalty("10");
    setSelectedListing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/80 via-white to-purple-50/60">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                stuDDeal
              </div>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700"
              >
                Модератор
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="outline"
                className="border-yellow-300 text-yellow-700"
              >
                <Icon name="Bell" size={14} className="mr-1" />
                {mockListings.filter((l) => l.status === "pending").length +
                  mockReports.filter((r) => r.status === "pending").length}
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-purple-600 text-white">
                  МД
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-purple-200 hover:bg-white/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    На модерации
                  </p>
                  <p className="text-3xl font-bold text-purple-800">
                    {mockListings.filter((l) => l.status === "pending").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-green-200 hover:bg-white/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Одобрено сегодня
                  </p>
                  <p className="text-3xl font-bold text-green-800">12</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name="CheckCircle"
                    size={24}
                    className="text-green-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-red-200 hover:bg-white/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Отклонено</p>
                  <p className="text-3xl font-bold text-red-800">3</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-yellow-200 hover:bg-white/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Жалобы</p>
                  <p className="text-3xl font-bold text-yellow-800">
                    {mockReports.filter((r) => r.status === "pending").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name="AlertTriangle"
                    size={24}
                    className="text-yellow-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="listings">Модерация объявлений</TabsTrigger>
            <TabsTrigger value="reports">Жалобы</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="grid gap-6">
              {mockListings
                .filter((l) => l.status === "pending")
                .map((listing) => (
                  <Card
                    key={listing.id}
                    className="bg-white/60 backdrop-blur-sm border-purple-200 hover:bg-white/80 transition-all duration-300 animate-fade-in"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {listing.title}
                              </h3>
                              <p className="text-purple-600 font-medium">
                                {listing.price.toLocaleString()} ₽
                              </p>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {listing.category}
                            </Badge>
                          </div>

                          <p className="text-gray-600 line-clamp-2">
                            {listing.description}
                          </p>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-purple-600 text-white text-sm">
                                  {listing.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {listing.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {listing.user.faculty}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  listing.user.reputation >= 200
                                    ? "default"
                                    : listing.user.reputation >= 100
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {listing.user.reputation} очков
                              </Badge>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedListing(listing);
                                  setIsApproveMode(true);
                                  handleApprove(listing);
                                }}
                              >
                                <Icon name="Check" size={16} className="mr-1" />
                                Одобрить
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                      setSelectedListing(listing);
                                      setIsApproveMode(false);
                                    }}
                                  >
                                    <Icon name="X" size={16} className="mr-1" />
                                    Отклонить
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white/95 backdrop-blur-sm">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Отклонить объявление
                                    </DialogTitle>
                                    <DialogDescription>
                                      Укажите причину отклонения и размер штрафа
                                      репутации
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Комментарий
                                      </label>
                                      <Textarea
                                        value={comment}
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        placeholder="Объясните причину отклонения..."
                                        className="bg-white/60"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Штраф репутации
                                      </label>
                                      <Select
                                        value={penalty}
                                        onValueChange={setPenalty}
                                      >
                                        <SelectTrigger className="bg-white/60">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="5">
                                            5 очков
                                          </SelectItem>
                                          <SelectItem value="10">
                                            10 очков
                                          </SelectItem>
                                          <SelectItem value="20">
                                            20 очков
                                          </SelectItem>
                                          <SelectItem value="50">
                                            50 очков
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Отмена</Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        selectedListing &&
                                        handleReject(selectedListing)
                                      }
                                    >
                                      Отклонить
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6">
              {mockReports
                .filter((r) => r.status === "pending")
                .map((report) => (
                  <Card
                    key={report.id}
                    className="bg-white/60 backdrop-blur-sm border-orange-200 hover:bg-white/80 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="destructive">
                              {report.type === "listing"
                                ? "Объявление"
                                : report.type === "user"
                                  ? "Пользователь"
                                  : "Отзыв"}
                            </Badge>
                            <Badge variant="outline">{report.reason}</Badge>
                          </div>
                          <p className="text-gray-600">{report.description}</p>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-orange-600 text-white text-sm">
                                {report.reportedBy.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                Жалоба от {report.reportedBy.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  report.createdAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Icon name="Eye" size={16} className="mr-1" />
                            Посмотреть
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Icon name="Check" size={16} className="mr-1" />
                            Решить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-center text-gray-500">
                  Управление пользователями будет доступно в следующей версии
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
