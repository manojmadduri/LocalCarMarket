import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Route, Fuel, Settings, Palette, Phone } from "lucide-react";
import type { Car } from "@shared/schema";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "status-badge-available";
      case "pending":
        return "status-badge-pending";
      case "sold":
        return "status-badge-sold";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "pending":
        return "Pending";
      case "sold":
        return "Sold";
      default:
        return status;
    }
  };

  return (
    <Card className="car-card-hover overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group">
      {/* Car Image - Clickable */}
      <Link href={`/cars/${car.id}`}>
        <div className="aspect-[4/3] bg-gray-200 relative cursor-pointer overflow-hidden">
          {car.images && car.images.length > 0 ? (
            <img
              src={car.images[0]}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🚗</div>
                <p className="text-sm">No image available</p>
              </div>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 transform transition-transform duration-300 group-hover:scale-110">
            <Badge className={getStatusColor(car.status)}>
              {getStatusText(car.status)}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/cars/${car.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-primary transition-colors cursor-pointer">
              {car.year} {car.make} {car.model}
            </h3>
          </Link>
        </div>
        
        <p className="text-2xl font-bold text-primary mb-3">
          {car.status === "sold" ? (
            <span className="line-through text-gray-400">{formatPrice(car.price)}</span>
          ) : (
            formatPrice(car.price)
          )}
        </p>

        {/* Car Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Route className="h-4 w-4 text-gray-400 mr-2" />
            <span>{formatMileage(car.mileage)} mi</span>
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 text-gray-400 mr-2" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Settings className="h-4 w-4 text-gray-400 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <Palette className="h-4 w-4 text-gray-400 mr-2" />
            <span>{car.color}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {car.status === "available" ? (
            <>
              <Link href={`/cars/${car.id}`} className="flex-1">
                <Button className="w-full form-button-primary text-sm">
                  View Details
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" className="w-full text-sm">
                  <Phone className="mr-1 h-3 w-3" />
                  Contact
                </Button>
              </Link>
            </>
          ) : car.status === "pending" ? (
            <Button disabled className="w-full text-sm">
              Sale Pending
            </Button>
          ) : (
            <>
              <Button disabled className="flex-1 text-sm">
                Sold
              </Button>
              <Link href="/cars" className="flex-1">
                <Button variant="outline" className="w-full text-sm">
                  Similar Cars
                </Button>
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
