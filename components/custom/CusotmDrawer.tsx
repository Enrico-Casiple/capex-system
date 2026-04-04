import React from 'react'
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { DrawerHeader, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from '../ui/drawer';

interface CustomDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const CustomDrawer = (props: CustomDrawerProps) => {
  return (
    <Drawer open={props.open} onOpenChange={props.setOpen} direction='right'>
      <DrawerContent 
        className="fixed right-0 top-0 bottom-0 h-screen max-h-screen rounded-none"
        style={{
          width: '100vw',
          maxWidth: '100vw',
        }}
      >
        <DrawerHeader className="relative border-b">
          <DrawerTitle>{props.title}</DrawerTitle>
          {props.description && <DrawerDescription>{props.description}</DrawerDescription>}
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {props.children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CustomDrawer
