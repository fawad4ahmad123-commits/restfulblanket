// app/contact/page.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, User, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground font-medium">Contact Us</span>
        </nav>

        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-slate-800/50">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Contact Us
            </CardTitle>
            <CardDescription className="text-base">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="h-11 transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="h-11 transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  className="min-h-[150px] resize-y transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                Send Message
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>We typically respond within 24 hours</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </CardFooter>
        </Card>

        {/* Additional Info - Optional */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center shadow-sm border border-border/50">
            <div className="text-2xl mb-1">📧</div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium">support@example.com</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center shadow-sm border border-border/50">
            <div className="text-2xl mb-1">📞</div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center shadow-sm border border-border/50">
            <div className="text-2xl mb-1">🕐</div>
            <p className="text-sm text-muted-foreground">Hours</p>
            <p className="text-sm font-medium">9AM - 6PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
