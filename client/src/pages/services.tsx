import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Star, Award, CheckCircle, Wrench, Settings, Car, Shield, Zap, Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { insertServiceBookingSchema, type Service, type InsertServiceBooking } from "@shared/schema";
import { z } from "zod";

const serviceBookingFormSchema = insertServiceBookingSchema.extend({
  preferredDate: z.date({
    required_error: "Please select a preferred service date",
  }),
});

type ServiceBookingFormData = z.infer<typeof serviceBookingFormSchema>;

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: InsertServiceBooking) => {
      const response = await fetch("/api/service-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to book service");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Service Booked Successfully",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setIsBookingOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/service-bookings"] });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ServiceBookingFormData>({
    resolver: zodResolver(serviceBookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleInfo: "",
      serviceType: "",
      preferredDate: new Date(),
      preferredTime: "09:00",
      description: "",
    },
  });

  const onSubmit = (data: ServiceBookingFormData) => {
    if (!selectedService) return;

    const bookingData: InsertServiceBooking = {
      serviceId: selectedService.id,
      customerName: data.fullName,
      customerEmail: data.email || "",
      customerPhone: data.phone,
      preferredDate: data.preferredDate.toISOString().split('T')[0],
      notes: data.description || "",
    };

    bookingMutation.mutate(bookingData);
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    form.setValue("serviceId", service.id);
    setIsBookingOpen(true);
  };

  // Comprehensive service categories and detailed explanations
  const serviceCategories = [
    {
      title: "Engine & Performance",
      icon: <Zap className="h-8 w-8" />,
      description: "Complete engine diagnostics, repairs, and performance optimization",
      color: "bg-red-100 text-red-600",
      services: [
        "Engine Diagnostics & Computer Scanning",
        "Engine Tune-ups & Performance Optimization", 
        "Timing Belt & Chain Replacement",
        "Fuel System Cleaning & Repair",
        "Exhaust System Repair & Replacement",
        "Emission Control System Service"
      ]
    },
    {
      title: "Brakes & Safety",
      icon: <Shield className="h-8 w-8" />,
      description: "Comprehensive brake service and safety system maintenance",
      color: "bg-blue-100 text-blue-600",
      services: [
        "Brake Pad & Rotor Replacement",
        "Brake Fluid Service & Bleeding",
        "Anti-lock Brake System (ABS) Repair",
        "Brake Line Inspection & Replacement",
        "Emergency Brake Adjustment",
        "Safety Inspection & Certification"
      ]
    },
    {
      title: "Transmission & Drivetrain",
      icon: <Settings className="h-8 w-8" />,
      description: "Expert transmission service and drivetrain repairs",
      color: "bg-purple-100 text-purple-600",
      services: [
        "Automatic Transmission Service",
        "Manual Transmission Repair",
        "Transmission Fluid Change",
        "Clutch Replacement & Repair",
        "Differential Service",
        "CV Joint & Axle Repair"
      ]
    },
    {
      title: "Suspension & Steering", 
      icon: <Car className="h-8 w-8" />,
      description: "Complete suspension and steering system service",
      color: "bg-green-100 text-green-600",
      services: [
        "Shock & Strut Replacement",
        "Wheel Alignment & Balancing",
        "Power Steering Service",
        "Suspension Component Replacement",
        "Tire Installation & Rotation",
        "Ball Joint & Tie Rod Service"
      ]
    },
    {
      title: "Electrical & Air Conditioning",
      icon: <Wrench className="h-8 w-8" />,
      description: "Advanced electrical diagnostics and climate control service",
      color: "bg-yellow-100 text-yellow-600",
      services: [
        "Electrical System Diagnostics",
        "Battery Testing & Replacement",
        "Alternator & Starter Repair",
        "Air Conditioning Service & Repair",
        "Heating System Service",
        "Wiring Repair & Replacement"
      ]
    },
    {
      title: "Preventive Maintenance",
      icon: <CheckCircle className="h-8 w-8" />,
      description: "Regular maintenance to keep your vehicle running smoothly",
      color: "bg-indigo-100 text-indigo-600",
      services: [
        "Oil Changes & Filter Replacement",
        "Multi-Point Inspections",
        "Fluid Level Checks & Top-offs",
        "Belt & Hose Inspection",
        "Battery & Charging System Test",
        "Seasonal Maintenance Programs"
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Expert Auto Repair Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            From routine maintenance to complex repairs, our ASE-certified technicians deliver 
            exceptional service with integrity and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call for Quote
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3">
              <Mail className="mr-2 h-5 w-5" />
              Request Service
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">ASE Certified</h3>
              <p className="text-gray-600">Professional certified technicians</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">12-month warranty on all repairs</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
              <p className="text-gray-600">Same-day service available</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">5-Star Reviews</h3>
              <p className="text-gray-600">Trusted by our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Service Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Automotive Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive automotive repair and maintenance services to keep your vehicle 
              running safely and efficiently. Our experienced technicians use state-of-the-art equipment 
              and genuine parts for every service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 rounded-full mb-4 ${category.color}`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{category.title}</CardTitle>
                  <CardDescription className="text-gray-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose The Integrity Auto and Body?</h2>
            <p className="text-lg text-gray-600">Experience the difference of working with true professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Our ASE-certified technicians have years of experience working on all makes and models.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Parts</h3>
              <p className="text-gray-600">We use only genuine OEM or high-quality aftermarket parts for all repairs.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Warranty</h3>
              <p className="text-gray-600">All our work comes with a 12-month warranty for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Services Display */}
      {services && services.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Service Today</h2>
              <p className="text-lg text-gray-600">Schedule your appointment with our professional team</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">{service.startingPrice}</span>
                      <Button onClick={() => handleBookService(service)} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Book Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Information */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Schedule Your Service?</h2>
          <p className="text-xl mb-8">Contact us today for professional automotive service you can trust</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* Service Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Service: {selectedService?.name}</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe any specific issues or requests..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={bookingMutation.isPending} className="flex-1">
                  {bookingMutation.isPending ? "Booking..." : "Book Service"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}