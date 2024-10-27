import React from 'react';
import styles from './viewListContent.module.scss'; // Предполагается, что у вас есть стили
import Pagination from '../pagination/pagination';
import SearchCruds from '../searchCruds/searchCruds';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';

// Base interface with an id property
interface ItemWithId {
  id: string | number; // The type of id can be adjusted
}

interface ViewListContentProps<T extends ItemWithId> {
  items: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  ItemComponent: React.ComponentType<T>;
  search?: boolean;
}
const ViewListContent = <T extends ItemWithId>({
  items,
  currentPage,
  totalPages,
  onPageChange,
  ItemComponent,
  search,
}: ViewListContentProps<T>): JSX.Element => {
  const { isOpen } = useAppSelector((state) => state.authAndRegForm);
  const admin = useCheckAdmin(isOpen);
  return (
    <div className={styles.containerCart}>
      {search && <SearchCruds />}
      <div className={styles.container_content}>
        {items.length < 1 ? <p>Не найдено</p> : <></>}
        {items.map((item) => (
          <ItemComponent {...item} key={item.id} admin={admin} />
        ))}
      </div>
      <div className={styles.paginationButtons}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ViewListContent;
