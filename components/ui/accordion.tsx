// "use client";

// import * as React from "react";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { Plus, Minus } from "lucide-react";

// import { cn } from "@/lib/utils";

// const Accordion = AccordionPrimitive.Root;

// const AccordionItem = React.forwardRef<
// 	React.ElementRef<typeof AccordionPrimitive.Item>,
// 	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
// >(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("faq-accordion", className)} {...props} />);
// AccordionItem.displayName = "AccordionItem";

// const AccordionTrigger = React.forwardRef<
// 	React.ElementRef<typeof AccordionPrimitive.Trigger>,
// 	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
// 	<AccordionPrimitive.Header className="flex">
// 		<AccordionPrimitive.Trigger
// 			ref={ref}
// 			className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all group", className)}
// 			{...props}
// 		>
// 			{children}
// 			<div className="relative h-8 w-8">
// 				<Plus className="h-8 w-8 shrink-0 transition-transform duration-200 text-orange plus-icon absolute inset-0 group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0" />
// 				<Minus className="h-8 w-8 shrink-0 transition-transform duration-200 text-orange minus-icon absolute inset-0 rotate-180 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100" />
// 			</div>
// 		</AccordionPrimitive.Trigger>
// 	</AccordionPrimitive.Header>
// ));
// AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// const AccordionContent = React.forwardRef<
// 	React.ElementRef<typeof AccordionPrimitive.Content>,
// 	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
// 	<AccordionPrimitive.Content
// 		ref={ref}
// 		className={cn(
// 			"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
// 			className
// 		)}
// 		{...props}
// 	>
// 		<div className="pb-4 pt-0">{children}</div>
// 	</AccordionPrimitive.Content>
// ));
// AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
