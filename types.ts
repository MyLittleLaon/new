// src/integrations/supabase/types.ts
export type Database = {
    public: {
      Tables: {
        bookings: {
          Row: {
            id: number;
            user_id: string;
            start_date: string;
            end_date: string;
          };
        };
      };
    };
  };
  